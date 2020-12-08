{
    'targets': [{
        'target_name': 'test',

        'include_dirs': [
            '<!(node -e "require(\'nan\')")',
#             "<(module_root_dir)/ext/SpiderMonkey-170"
        ],

        'conditions':  [
#             [
#                 "OS=='mac'", {
#                     'sources': [
#                         "<!@(node -p \"require('fs').readdirSync('./src-mac').map(f=>'src-mac/'+f).join(' ')\")"
#                     ],
#                 }
#             ],

            [
                "OS=='win'", {
                    'sources': [
                        "<!@(node -p \"require('fs').readdirSync('./src-win').map(f=>'src-win/'+f).join(' ')\")"
                    ],

                    'libraries': [
                        "-l Credui.lib",
                        "-l Ws2_32.lib",
                        "-l Secur32.lib",
                        "-l Winhttp.lib",
                        "-l WinInet.lib",
                    ],

                    'conditions': [
                        ['target_arch=="ia32"', {
                            'libraries': [
                                # "-l Credui.lib",
                                # "-l Ws2_32.lib",
                                # "-l Secur32.lib",
#                                 "-l <(module_root_dir)/ext/SpiderMonkey-170/Prebuilt/SpiderMonkey_32.lib"
                            ]
                        }],

                        ['target_arch=="x64"', {
                            'libraries': [
                                # "-l Credui.lib",
                                # "-l Ws2_32.lib",
                                # "-l Secur32.lib",
#                                 "-l <(module_root_dir)/ext/SpiderMonkey-170/Prebuilt/SpiderMonkey_64.lib"
                            ]
                        }]
                    ],

                    'defines': [
                        '_UNICODE',
                        'UNICODE',
                    ],
                }
            ]
        ]
    }]
}
