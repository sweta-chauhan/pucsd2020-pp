package model

type User struct {
	Id            int64  `json:"id,omitempty" key:"primary" autoincr:"1" column:"id"`
	FirstName     string `json:"first_name" column:"first_name"`
	LastName      string `json:"last_name" column:"last_name"`
	UserName	  string `json:"username" column:"username"`
	Email         string `json:"email" column:"email"`
	Password      string `json:"password" column:"password"`
	IsSudo        int64  `json:"is_sudo" column:"is_sudo_access"`
}

func (user *User) Table() string {
	return "user_detail"
}

func (user *User) String() string {
	return Stringify(user)
}
