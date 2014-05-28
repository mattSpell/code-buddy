var fullEditor = new Quill('#full-editor', {
  modules: {
    'authorship': {enabled: true},
    'multi-cursor': true,
    'toolbar': {container: '#full-toolbar'},
    'image-tooltip': true,
    'link-tooltip': true
  },
  theme: 'snow'
});
var html = editor.getHTML();

//# sourceMappingURL=quilltest.map
