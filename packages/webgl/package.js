Package.describe({
    name: 'budickda:webgl',
    summary: '',
    git: 'https://github.com/budickda/meteor-webgl',
    version: '0.0.1'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2');

    api.use([
        'ecmascript'
    ]);

    api.addFiles(['library/sylvester.js','engine.js','shader.js','perspective.js'],'client');
    if (api.export) {
        api.export('Engine');
    }
});

Package.onTest(function(api) {
});