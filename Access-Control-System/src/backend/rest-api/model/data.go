package model

type Data struct {
	Id		int64  `json:"id,omitempty" key:"primary" autoincr:"1" column:"id"`
	User_id int64  `json:"uid" key:"foreign" column:"user_id"`
	Is_active_on_social_media int64 `json:"status" column:"status_on_social_media"`
}


func (data *Data) Table() string{
	return "user_data"
	}

func (data *Data) String() string{
	return Stringify(data)
}
