document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzMiLCJqdGkiOiJlNGUyZTgyZDM4ODkwOGUyOTcyZGUxMzEwOTc4MWJiYzcyZTAwMmEwM2JjZjY5NGNjNzhhZTgyZWU2NThhZGY3MzcyNjRlYTk5YzZlN2Y2MyIsImlhdCI6MTYzMjgwNDQwMCwibmJmIjoxNjMyODA0NDAwLCJleHAiOjE2NjQzNDA0MDAsInN1YiI6IjE0MzciLCJzY29wZXMiOltdfQ.ANU71Nl9syFSa7zKN4XIzEX5rnJ6cJ1g8SsFSz5EDActwpVwuxzpgf_HdpsdOcCwzTwPdy-18kx0HAHKsXE0tsbYY8Ncyf9tYuTlxcKXxXTA4YI29y7-ACAjLHpdTi29hwsTxYltwYYx-TxUYrEjOSrBOPOhluhn56F3DvdGw3JPS40aHZ7bpnJojLw8Ysv5Kpm4wFCjLQewoNpLfu7p53wYQ3jjusR4UDFE3M6I1nrmj3Pfsik4q9uKhimas0nm8PXhGSRbfaJPzTlNOVAcNdZuOMMnLIQt8ENThNZ_9z0HLLSvPc0jjzHEDRyu-khPGEPeFH56Kjm6GUYXwxl3LRPxTMWRcRP6q-JcphfOXkUaUfWilNRJ3jndzvta1vTqmgVUTO6xH3EoNGo_oYhA56b1Gm4UVc50Z3K2jG3Q4omzdkZlufLN9JB5H6eH6cQEEEP9rrSOX_lDRUchbqLDbBC9dghMr7E5R6uDlA9PAT5pcsPsydEvjTcPbv3aa5jRfvO31oixkR2JXGlHi3mTIAxI60eB_3NcgUEehtSwyx7o-epMDE6T6FL2fsBo5Kz_Bi4Cb-2Mem0umbD92kgFny1RBF7Vxj7eosMZXkdI6US6lIiC0bLVwr4bUnOVJ2lR5MNboIqw9IFT7JTLR8qaVfyUs4kTxi4que8JXmmYyDU'
    $.ajax({
        url: "https://lite.curriki.org/api/api/v1/h5p/35430",
        headers: {
            Authorization: 'Bearer '+token
        },
        success: (res) => {
            console.log(res.settings);
            $.each(res.settings, (key, item) => {
                if(key == "core") {
                    item.scripts.forEach(element => {
                       element[2] = "html.js"
                    })
                }
            })
            var setting = res.settings;
            var user = res.user;
            var html = '';
            var obj = '';
            $.each(res, (key, val) => {
                if (typeof val == "object") {
                    obj += val;
                } else if (typeof val == "string") {
                    html += val;
                }
            });
            window.H5PIntegration = {...setting, ...user}
            console.log(window.H5PIntegration)
           
            $("#mainBody").append(html);
            var scripts = `<script src="js/h5p/jquery.js"></script>
            <script src="js/h5p/h5p.js"></script>
            <script src="js/h5p/h5p-event-dispatcher.js"></script>
            <script src="js/h5p/h5p-x-api.js"></script>
            <script src="js/h5p/h5p-x-api-event.js"></script>
            <script src="js/h5p/h5p-content-type.js"></script>
            <script src="js/h5p/DocumentsUpload.js"></script>`;
            $("#mainBody").append(scripts);

            H5P.externalDispatcher.on('xAPI', function (event) {
                console.log(event.data.statement);
              });
        }
    });
   
}