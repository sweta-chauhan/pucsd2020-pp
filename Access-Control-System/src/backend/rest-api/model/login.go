package model

type LoginCreden struct {
	UserName	int64  `json:"username" column:"username"`
	Password int64  `json:"password" column:"password"`
	IsSudoAccess int64 `json:"is_sudo" column:"is_sudo_access"`
}


func (login *LoginCreden) Table() string{
	return "user_detail"
	}

func (login *LoginCreden) String() string{
	return Stringify(login)
}
