package feegrant_test

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"

	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	simtestutil "github.com/cosmos/cosmos-sdk/testutil/sims"
	sdk "github.com/cosmos/cosmos-sdk/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	"github.com/cosmos/cosmos-sdk/x/feegrant"
	"github.com/cosmos/cosmos-sdk/x/feegrant/keeper"
	"github.com/cosmos/cosmos-sdk/x/feegrant/testutil"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
)

func TestBasicFeeValidAllow(t *testing.T) {
	var (
		interfaceRegistry codectypes.InterfaceRegistry
		bankKeeper        bankkeeper.Keeper
		stakingKeeper     *stakingkeeper.Keeper
		feegrantKeeper    keeper.Keeper
	)

	app, err := simtestutil.Setup(testutil.AppConfig,
		&feegrantKeeper,
		&bankKeeper,
		&stakingKeeper,
		&interfaceRegistry,
	)
	require.NoError(t, err)

	ctx := app.BaseApp.NewContext(false, tmproto.Header{Height: 1})

	badTime := ctx.BlockTime().AddDate(0, 0, -1)
	allowace := &feegrant.BasicAllowance{
		Expiration: &badTime,
	}
	require.Error(t, allowace.ValidateBasic())

	ctx = app.BaseApp.NewContext(false, tmproto.Header{
		Time: time.Now(),
	})
	eth := sdk.NewCoins(sdk.NewInt64Coin("eth", 10))
	atom := sdk.NewCoins(sdk.NewInt64Coin("atom", 555))
	smallAtom := sdk.NewCoins(sdk.NewInt64Coin("atom", 43))
	bigAtom := sdk.NewCoins(sdk.NewInt64Coin("atom", 1000))
	leftAtom := sdk.NewCoins(sdk.NewInt64Coin("atom", 512))
	now := ctx.BlockTime()
	oneHour := now.Add(1 * time.Hour)

	cases := map[string]struct {
		allowance *feegrant.BasicAllowance
		// all other checks are ignored if valid=false
		fee       sdk.Coins
		blockTime time.Time
		valid     bool
		accept    bool
		remove    bool
		remains   sdk.Coins
	}{
		"empty": {
			allowance: &feegrant.BasicAllowance{},
			accept:    true,
		},
		"small fee without expire": {
			allowance: &feegrant.BasicAllowance{
				SpendLimit: atom,
			},
			fee:     smallAtom,
			accept:  true,
			remove:  false,
			remains: leftAtom,
		},
		"all fee without expire": {
			allowance: &feegrant.BasicAllowance{
				SpendLimit: smallAtom,
			},
			fee:    smallAtom,
			accept: true,
			remove: true,
		},
		"wrong fee": {
			allowance: &feegrant.BasicAllowance{
				SpendLimit: smallAtom,
			},
			fee:    eth,
			accept: false,
		},
		"non-expired": {
			allowance: &feegrant.BasicAllowance{
				SpendLimit: atom,
				Expiration: &oneHour,
			},
			valid:     true,
			fee:       smallAtom,
			blockTime: now,
			accept:    true,
			remove:    false,
			remains:   leftAtom,
		},
		"expired": {
			allowance: &feegrant.BasicAllowance{
				SpendLimit: atom,
				Expiration: &now,
			},
			valid:     true,
			fee:       smallAtom,
			blockTime: oneHour,
			accept:    false,
			remove:    true,
		},
		"fee more than allowed": {
			allowance: &feegrant.BasicAllowance{
				SpendLimit: atom,
				Expiration: &oneHour,
			},
			valid:     true,
			fee:       bigAtom,
			blockTime: now,
			accept:    false,
		},
		"with out spend limit": {
			allowance: &feegrant.BasicAllowance{
				Expiration: &oneHour,
			},
			valid:     true,
			fee:       bigAtom,
			blockTime: now,
			accept:    true,
		},
		"expired no spend limit": {
			allowance: &feegrant.BasicAllowance{
				Expiration: &now,
			},
			valid:     true,
			fee:       bigAtom,
			blockTime: oneHour,
			accept:    false,
		},
	}

	for name, stc := range cases {
		tc := stc // to make scopelint happy
		t.Run(name, func(t *testing.T) {
			err := tc.allowance.ValidateBasic()
			require.NoError(t, err)

			ctx := app.BaseApp.NewContext(false, tmproto.Header{}).WithBlockTime(tc.blockTime)

			// now try to deduct
			removed, err := tc.allowance.Accept(ctx, tc.fee, []sdk.Msg{})
			if !tc.accept {
				require.Error(t, err)
				return
			}
			require.NoError(t, err)

			require.Equal(t, tc.remove, removed)
			if !removed {
				assert.Equal(t, tc.allowance.SpendLimit, tc.remains)
			}
		})
	}
}
