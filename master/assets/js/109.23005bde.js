(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{617:function(e,t,a){"use strict";a.r(t);var s=a(1),o=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"adr-049-state-sync-hooks"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adr-049-state-sync-hooks"}},[e._v("#")]),e._v(" ADR 049: State Sync Hooks")]),e._v(" "),a("h2",{attrs:{id:"changelog"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),a("ul",[a("li",[e._v("Jan 19, 2022: Initial Draft")])]),e._v(" "),a("h2",{attrs:{id:"status"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),a("p",[e._v("Draft, Under Implementation")]),e._v(" "),a("h2",{attrs:{id:"abstract"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#abstract"}},[e._v("#")]),e._v(" Abstract")]),e._v(" "),a("p",[e._v("This ADR outlines a hooks-based mechanism for application modules to provide additional state (outside of the IAVL tree) to be used\nduring state sync.")]),e._v(" "),a("h2",{attrs:{id:"context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),a("p",[e._v("New clients use state-sync to download snapshots of module state from peers. Currently, the snapshot consists of a\nstream of "),a("code",[e._v("SnapshotStoreItem")]),e._v(" and "),a("code",[e._v("SnapshotIAVLItem")]),e._v(", which means that application modules that define their state outside of the IAVL\ntree cannot include their state as part of the state-sync process.")]),e._v(" "),a("p",[e._v("Note, Even though the module state data is outside of the tree, for determinism we require that the hash of the external data should\nbe posted in the IAVL tree.")]),e._v(" "),a("h2",{attrs:{id:"decision"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),a("p",[e._v("A simple proposal based on our existing implementation is that, we can add two new message types: "),a("code",[e._v("SnapshotExtensionMeta")]),e._v("\nand "),a("code",[e._v("SnapshotExtensionPayload")]),e._v(", and they are appended to the existing multi-store stream with "),a("code",[e._v("SnapshotExtensionMeta")]),e._v("\nacting as a delimiter between extensions. As the chunk hashes should be able to ensure data integrity, we don't need\na delimiter to mark the end of the snapshot stream.")]),e._v(" "),a("p",[e._v("Besides, we provide "),a("code",[e._v("Snapshotter")]),e._v(" and "),a("code",[e._v("ExtensionSnapshotter")]),e._v(" interface for modules to implement snapshotters, which will handle both taking\nsnapshot and the restoration. Each module could have mutiple snapshotters, and for modules with additional state, they should\nimplement "),a("code",[e._v("ExtensionSnapshotter")]),e._v(" as extension snapshotters. When setting up the application, the snapshot "),a("code",[e._v("Manager")]),e._v(" should call\n"),a("code",[e._v("RegisterExtensions([]ExtensionSnapshotter…)")]),e._v(" to register all the extension snapshotters.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"proto",base64:"Ly8gU25hcHNob3RJdGVtIGlzIGFuIGl0ZW0gY29udGFpbmVkIGluIGEgcm9vdG11bHRpLlN0b3JlIHNuYXBzaG90LgovLyBPbiB0b3Agb2YgdGhlIGV4c2l0aW5nIFNuYXBzaG90U3RvcmVJdGVtIGFuZCBTbmFwc2hvdElBVkxJdGVtLCB3ZSBhZGQgdHdvIG5ldyBvcHRpb25zIGZvciB0aGUgaXRlbS4KbWVzc2FnZSBTbmFwc2hvdEl0ZW0gewogIC8vIGl0ZW0gaXMgdGhlIHNwZWNpZmljIHR5cGUgb2Ygc25hcHNob3QgaXRlbS4KICBvbmVvZiBpdGVtIHsKICAgIFNuYXBzaG90U3RvcmVJdGVtICAgICAgICBzdG9yZSAgICAgICAgICAgICA9IDE7CiAgICBTbmFwc2hvdElBVkxJdGVtICAgICAgICAgaWF2bCAgICAgICAgICAgICAgPSAyIFsoZ29nb3Byb3RvLmN1c3RvbW5hbWUpID0gJnF1b3Q7SUFWTCZxdW90O107CiAgICBTbmFwc2hvdEV4dGVuc2lvbk1ldGEgICAgZXh0ZW5zaW9uICAgICAgICAgPSAzOwogICAgU25hcHNob3RFeHRlbnNpb25QYXlsb2FkIGV4dGVuc2lvbl9wYXlsb2FkID0gNDsKICB9Cn0KCi8vIFNuYXBzaG90RXh0ZW5zaW9uTWV0YSBjb250YWlucyBtZXRhZGF0YSBhYm91dCBhbiBleHRlcm5hbCBzbmFwc2hvdHRlci4KLy8gT25lIG1vZHVsZSBtYXkgbmVlZCBtdWx0aXBsZSBzbmFwc2hvdHRlcnMsIHNvIGVhY2ggbW9kdWxlIG1heSBoYXZlIG11bHRpcGxlIFNuYXBzaG90RXh0ZW5zaW9uTWV0YS4KbWVzc2FnZSBTbmFwc2hvdEV4dGVuc2lvbk1ldGEgewogIC8vIHRoZSBuYW1lIG9mIHRoZSBFeHRlbnNpb25TbmFwc2hvdHRlciwgYW5kIGl0IGlzIHJlZ2lzdGVyZWQgdG8gc25hcHNob3R0ZXIgbWFuYWdlciB3aGVuIHNldHRpbmcgdXAgdGhlIGFwcGxpY2F0aW9uCiAgLy8gbmFtZSBzaG91bGQgYmUgdW5pcXVlIGZvciBlYWNoIEV4dGVuc2lvblNuYXBzaG90dGVyIGFzIHdlIG5lZWQgdG8gYWxwaGFiZXRpY2FsbHkgb3JkZXIgdGhlaXIgc25hcHNob3RzIHRvIGdldAogIC8vIGRldGVybWluaXN0aWMgc25hcHNob3Qgc3RyZWFtLgogIHN0cmluZyBuYW1lICAgPSAxOwogIC8vIHRoaXMgaXMgdXNlZCBieSBlYWNoIEV4dGVuc2lvblNuYXBzaG90dGVyIHRvIGRlY2lkZSB0aGUgZm9ybWF0IG9mIHBheWxvYWRzIGluY2x1ZGVkIGluIFNuYXBzaG90RXh0ZW5zaW9uUGF5bG9hZCBtZXNzYWdlCiAgLy8gaXQgaXMgdXNlZCB3aXRoaW4gdGhlIHNuYXBzaG90dGVyL25hbWVzcGFjZSwgbm90IGdsb2JhbCBvbmUgZm9yIGFsbCBtb2R1bGVzCiAgdWludDMyIGZvcm1hdCA9IDI7Cn0KCi8vIFNuYXBzaG90RXh0ZW5zaW9uUGF5bG9hZCBjb250YWlucyBwYXlsb2FkcyBvZiBhbiBleHRlcm5hbCBzbmFwc2hvdHRlci4KbWVzc2FnZSBTbmFwc2hvdEV4dGVuc2lvblBheWxvYWQgewogIGJ5dGVzIHBheWxvYWQgPSAxOwp9Cg=="}}),e._v(" "),a("p",[e._v("When we create a snapshot stream, the "),a("code",[e._v("multistore")]),e._v(" snapshot is always placed at the beginning of the binary stream, and other extension snapshots are alphabetically ordered by the name of the corresponding "),a("code",[e._v("ExtensionSnapshotter")]),e._v(".")]),e._v(" "),a("p",[e._v("The snapshot stream would look like as follows:")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gbXVsdGktc3RvcmUgc25hcHNob3QKe1NuYXBzaG90U3RvcmVJdGVtIHwgU25hcHNob3RJQVZMSXRlbSwgLi4ufQovLyBleHRlbnNpb24xIHNuYXBzaG90ClNuYXBzaG90RXh0ZW5zaW9uTWV0YQp7U25hcHNob3RFeHRlbnNpb25QYXlsb2FkLCAuLi59Ci8vIGV4dGVuc2lvbjIgc25hcHNob3QKU25hcHNob3RFeHRlbnNpb25NZXRhCntTbmFwc2hvdEV4dGVuc2lvblBheWxvYWQsIC4uLn0K"}}),e._v(" "),a("p",[e._v("We add an "),a("code",[e._v("extensions")]),e._v(" field to snapshot "),a("code",[e._v("Manager")]),e._v(" for extension snapshotters. The "),a("code",[e._v("multistore")]),e._v(" snapshotter is a special one and it doesn't need a name because it is always placed at the beginning of the binary stream.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"dHlwZSBNYW5hZ2VyIHN0cnVjdCB7CglzdG9yZSAgICAgICpTdG9yZQoJbXVsdGlzdG9yZSB0eXBlcy5TbmFwc2hvdHRlcgoJZXh0ZW5zaW9ucyBtYXBbc3RyaW5nXXR5cGVzLkV4dGVuc2lvblNuYXBzaG90dGVyCgltdHggICAgICAgICAgICAgICAgc3luYy5NdXRleAoJb3BlcmF0aW9uICAgICAgICAgIG9wZXJhdGlvbgoJY2hSZXN0b3JlICAgICAgICAgIGNoYW4mbHQ7LSBpby5SZWFkQ2xvc2VyCgljaFJlc3RvcmVEb25lICAgICAgJmx0Oy1jaGFuIHJlc3RvcmVEb25lCglyZXN0b3JlQ2h1bmtIYXNoZXMgW11bXWJ5dGUKCXJlc3RvcmVDaHVua0luZGV4ICB1aW50MzIKfQo="}}),e._v(" "),a("p",[e._v("For extension snapshotters that implement the "),a("code",[e._v("ExtensionSnapshotter")]),e._v(" interface, their names should be registered to the snapshot "),a("code",[e._v("Manager")]),e._v(" by\ncalling "),a("code",[e._v("RegisterExtensions")]),e._v(" when setting up the application. The snapshotters will handle both taking snapshot and restoration.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gUmVnaXN0ZXJFeHRlbnNpb25zIHJlZ2lzdGVyIGV4dGVuc2lvbiBzbmFwc2hvdHRlcnMgdG8gbWFuYWdlcgpmdW5jIChtICpNYW5hZ2VyKSBSZWdpc3RlckV4dGVuc2lvbnMoZXh0ZW5zaW9ucyAuLi50eXBlcy5FeHRlbnNpb25TbmFwc2hvdHRlcikgZXJyb3IgCg=="}}),e._v(" "),a("p",[e._v("On top of the existing "),a("code",[e._v("Snapshotter")]),e._v(" interface for the "),a("code",[e._v("multistore")]),e._v(", we add "),a("code",[e._v("ExtensionSnapshotter")]),e._v(" interface for the extension snapshotters. Three more function signatures: "),a("code",[e._v("SnapshotFormat()")]),e._v(", "),a("code",[e._v("SupportedFormats()")]),e._v(" and "),a("code",[e._v("SnapshotName()")]),e._v(" are added to "),a("code",[e._v("ExtensionSnapshotter")]),e._v(".")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gRXh0ZW5zaW9uU25hcHNob3R0ZXIgaXMgYW4gZXh0ZW5zaW9uIFNuYXBzaG90dGVyIHRoYXQgaXMgYXBwZW5kZWQgdG8gdGhlIHNuYXBzaG90IHN0cmVhbS4KLy8gRXh0ZW5zaW9uU25hcHNob3R0ZXIgaGFzIGFuIHVuaXF1ZSBuYW1lIGFuZCBtYW5hZ2VzIGl0J3Mgb3duIGludGVybmFsIGZvcm1hdHMuCnR5cGUgRXh0ZW5zaW9uU25hcHNob3R0ZXIgaW50ZXJmYWNlIHsKCVNuYXBzaG90dGVyCgoJLy8gU25hcHNob3ROYW1lIHJldHVybnMgdGhlIG5hbWUgb2Ygc25hcHNob3R0ZXIsIGl0IHNob3VsZCBiZSB1bmlxdWUgaW4gdGhlIG1hbmFnZXIuCglTbmFwc2hvdE5hbWUoKSBzdHJpbmcKCgkvLyBTbmFwc2hvdEZvcm1hdCByZXR1cm5zIHRoZSBkZWZhdWx0IGZvcm1hdCB1c2VkIHRvIHRha2UgYSBzbmFwc2hvdC4KCVNuYXBzaG90Rm9ybWF0KCkgdWludDMyCgoJLy8gU3VwcG9ydGVkRm9ybWF0cyByZXR1cm5zIGEgbGlzdCBvZiBmb3JtYXRzIGl0IGNhbiByZXN0b3JlIGZyb20uCglTdXBwb3J0ZWRGb3JtYXRzKCkgW111aW50MzIKfQo="}}),e._v(" "),a("h2",{attrs:{id:"consequences"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),a("p",[e._v("As a result of this implementation, we are able to create snapshots of binary chunk stream for the state that we maintain outside of the IAVL Tree, CosmWasm blobs for example. And new clients are able to fetch sanpshots of state for all modules that have implemented the corresponding interface from peer nodes.")]),e._v(" "),a("h3",{attrs:{id:"backwards-compatibility"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#backwards-compatibility"}},[e._v("#")]),e._v(" Backwards Compatibility")]),e._v(" "),a("p",[e._v("This ADR introduces new proto message types, add an "),a("code",[e._v("extensions")]),e._v(" field in snapshot "),a("code",[e._v("Manager")]),e._v(", and add new "),a("code",[e._v("ExtensionSnapshotter")]),e._v(" interface, so this is not backwards compatible if we have extensions.")]),e._v(" "),a("p",[e._v("But for applications that does not have the state data outside of the IAVL tree for any module, the snapshot stream is backwards-compatible.")]),e._v(" "),a("h3",{attrs:{id:"positive"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),a("ul",[a("li",[e._v("State maintained outside of IAVL tree like CosmWasm blobs can create snapshots by implementing extension snapshotters, and being fetched by new clients via state-sync.")])]),e._v(" "),a("h3",{attrs:{id:"negative"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),a("h3",{attrs:{id:"neutral"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[e._v("#")]),e._v(" Neutral")]),e._v(" "),a("ul",[a("li",[e._v("All modules that maintain state outside of IAVL tree need to implement "),a("code",[e._v("ExtensionSnapshotter")]),e._v(" and the snapshot "),a("code",[e._v("Manager")]),e._v(" need to call "),a("code",[e._v("RegisterExtensions")]),e._v(" when setting up the application.")])]),e._v(" "),a("h2",{attrs:{id:"further-discussions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#further-discussions"}},[e._v("#")]),e._v(" Further Discussions")]),e._v(" "),a("p",[e._v("While an ADR is in the DRAFT or PROPOSED stage, this section should contain a summary of issues to be solved in future iterations (usually referencing comments from a pull-request discussion).\nLater, this section can optionally list ideas or improvements the author or reviewers found during the analysis of this ADR.")]),e._v(" "),a("h2",{attrs:{id:"test-cases-optional"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#test-cases-optional"}},[e._v("#")]),e._v(" Test Cases [optional]")]),e._v(" "),a("p",[e._v("Test cases for an implementation are mandatory for ADRs that are affecting consensus changes. Other ADRs can choose to include links to test cases if applicable.")]),e._v(" "),a("h2",{attrs:{id:"references"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),a("ul",[a("li",[e._v("https://github.com/cosmos/cosmos-sdk/pull/10961")]),e._v(" "),a("li",[e._v("https://github.com/cosmos/cosmos-sdk/issues/7340")]),e._v(" "),a("li",[e._v("https://hackmd.io/gJoyev6DSmqqkO667WQlGw")])])],1)}),[],!1,null,null,null);t.default=o.exports}}]);