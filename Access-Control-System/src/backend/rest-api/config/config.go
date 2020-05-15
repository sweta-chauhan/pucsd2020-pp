package config

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
)

const (
	configFile = "/etc/myproject/configuration.cfg"
)

var (
	_config *RestApiConfig
)

type RestApiConfig struct {
	Host     string          `json:"host"`
	Port     int             `json:"port"`
	Database MysqlConnection `json:"database"`
}

type MysqlConnection struct {
	Database       string `json:"dbname"`
	Host           string `json:"host"`
	Port           int    `json:"port"`
	Username       string `json:"user"`
	Password       string `json:"password"`
	IdleConnection int    `json:"idle_connection"`
	MaxConnection  int    `json:"max_connection"`
}

func (api *RestApiConfig) String() string {
	log.Printf("Sending Api response in String")
	byts, _ := json.Marshal(api)
	return string(byts)
}

func init() {
	//log.Printf("Reading Configuration File")
	file, err := ioutil.ReadFile(configFile)
	if nil != err {
		log.Printf("Error while reading config file: %s:%s", configFile, err.Error())
		os.Exit(1)
	}
	
	_config = new(RestApiConfig)
	err = json.Unmarshal(file, _config)
	//log.Printf("Dumping configuration file values to const _config")
	if nil != err {
		log.Printf("Error while reading configuration: %s:%s", configFile, err.Error())
		os.Exit(1)
	}
}

func Config() *RestApiConfig {
	//log.Printf("Returning configuration strings")
	return _config
}


func (cfg *MysqlConnection) ConnString() string {
	//log.Printf("Now I am getting connection string response")
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s", cfg.Username, cfg.Password,
		cfg.Host, cfg.Port, cfg.Database)
}
