#!/bin/bash

# Generate SSL key and certification files
function main() {
  local target_ca=$1
  openssl req -new -x509 -days 18250 -extensions v3_ca -keyout %target_ca%.key -out %target_ca%.crt
}

#!/bin/bash

function main(){
  local target_ca=$1
  echo $target_ca
  if [ -n "$target_ca" ]; then {
    openssl req -new -x509 -days 18250 -extensions v3_ca -keyout $target_ca.key -out $target_ca.crt
    
  } else {
     echo "Usage:"
     echo "      . ./00_ssl_create_crt.sh <target_ca name>"
  };fi
}

main $1
