# Explorer

A FGC blockchain explorer web application service for [FantasyGoldcore Node](https://github.com/fantasygold/fantasygoldcore-node) using the [FGC API](https://github.com/fantasygold/insight-api).


## Getting Started

1. Install nvm https://github.com/creationix/nvm  

    ```bash
    nvm i v10
    nvm use v10
    ```  
2. Install mongo https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/  and create a database named `fantasygold-api-livenet` or something that will match the db section of `fantasygoldcore-node.json` in Step 5  

3. Install fantasygold-bitcore https://github.com/fantasygold/fantasygold-bitcore - with ZMQ ! 

    ```bash
    # with ZMQ
    sudo apt-get install libzmq3-dev 
    ```  
4. Install fantasygoldcore-node  

    ```bash
    npm i https://github.com/fantasygold/fantasygoldcore-node.git#master

    $(npm bin)/fantasygoldcore-node create mynode

    cd mynode

    $(npm bin)/fantasygoldcore-node install https://github.com/fantasygold/insight-api.git#master
    $(npm bin)/fantasygoldcore-node install https://github.com/fantasygold/fantasygold-explorer.git#master
    ```  
5. Edit fantasygoldcore-node.json
    ### Note If you do not want or need to run explorer front end, simply remove in “services” the text “fantasygold-explorer”, and then we have only the API and WEB service running.  

    ```json
    {
      "network": "livenet",
      "port": 3001,
      "services": [
        "fantasygoldd",
        "fantasygold-insight-api",
        "fantasygold-explorer",
        "web"
      ],
      "servicesConfig": {
        "fantasygold-explorer": {
          "apiPrefix": "fantasygold-insight-api",
          "routePrefix": "fantasygold-explorer"
          
       },
       "fantasygold-insight-api": {
         "routePrefix": "fantasygold-insight-api",
         "rateLimiterOptions": {
           "whitelist": [
             "123.456.12.34",
             "::ffff:123.456.12.34"
           ],
           "whitelistLimit": 9999999,
           "limit": 200,
           "interval": 60000,
           "banInterval": 3600000
         },
          "db": {
            "host": "127.0.0.1",
            "port": "27017",
            "database": "fantasygold-api-livenet",
            "user": "",
            "password": ""
         },
          "erc20": {
            "updateFromBlockHeight": 0
          }
        },
        "fantasygoldd": {
          "spawn": {
            "datadir": "/home/user/mynode/data",
           "exec": "/home/user/mynode/node_modules/fantasygoldcore-node/bin/fantasygoldd"
          }
        }
      }
    }

    ```  
6. Edit fantasygold.conf & add rpc creds. 

    ```
    cd /mynode/data

    nano fantasygold.conf 
    ```
    Paste in the following 
    ```
    server=1
    whitelist=127.0.0.1
    txindex=1
    addressindex=1
    timestampindex=1
    spentindex=1
    zmqpubrawtx=tcp://127.0.0.1:28332
    zmqpubhashblock=tcp://127.0.0.1:28332
    rpcallowip=127.0.0.1
    rpcuser=user
    rpcpassword=password
    rpcport=57810
    reindex=1
    gen=0
    addrindex=1
    logevents=1
    ```  
  Navigate to the directory

`/home/user/mynode/node_modules/fantasygoldd-rpc/lib/` 

Edit the index.js with the same rpc creds you used in `fantasygold.com` above, this includes the rpc port, rpc user, rpc password.

Save the file, now let’s go to another directory to make this change.

Browse to the directory:

`/home/user/mynode/node_modules/fantasygoldcore-node/lib/services/`

Edit the fantasygoldd.js file and edit by placing THE SAME credentials placed in the previous file, save the file and close it.

7. Navigate to the scripts directory:
    ```
    
    cd /home/user/mynode/node_modules/fantasygoldcore-node/scripts/
    ```
    Run the download script to download fantasygoldd

    ```
    ./download
    ```


7. Run Node 

  Navigate to the execution directory 
    ```
    cd /home/user/mynode/node_modules/fantasygoldcore-node/bin
    ```
  Then run the node with:
    ```
    ./fantasygoldcore-node start
    ```  

8. Open a web browser to `http://localhost:3001/fantasygold-explorer` or `http://localhost:3001/fantasygold-insight-api`  

## Development

To run Insight UI locally in development mode:

Install bower dependencies:

```
$ bower install
```

To compile and minify the web application's assets:

```
$ grunt compile
```

There is a convenient Gruntfile.js for automation during editing the code

```
$ grunt
```

## Multilanguage support

Insight UI uses [angular-gettext](http://angular-gettext.rocketeer.be) for multilanguage support.

To enable a text to be translated, add the ***translate*** directive to html tags. See more details [here](http://angular-gettext.rocketeer.be/dev-guide/annotate/). Then, run:

```
grunt compile
```

This action will create a template.pot file in ***po/*** folder. You can open it with some PO editor ([Poedit](http://poedit.net)). Read this [guide](http://angular-gettext.rocketeer.be/dev-guide/translate/) to learn how to edit/update/import PO files from a generated POT file. PO file will be generated inside po/ folder.

If you make new changes, simply run **grunt compile** again to generate a new .pot template and the angular javascript ***js/translations.js***. Then (if use Poedit), open .po file and choose ***update from POT File*** from **Catalog** menu.

Finally changes your default language from ***public/src/js/config***

```
gettextCatalog.currentLanguage = 'es';
```

This line will take a look at any *.po files inside ***po/*** folder, e.g.
**po/es.po**, **po/nl.po**. After any change do not forget to run ***grunt
compile***.


## Note

For more details about the [FGC API](https://github.com/fantasygold/insight-api) configuration and end-points, go to [FGC API](https://github.com/fantasygold/insight-api).

## Contribute

Contributions and suggestions are welcomed at the [Explorer GitHub repository](https://github.com/fantasygold/fantasygold-explorer).


## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
