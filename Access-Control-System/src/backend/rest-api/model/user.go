package model

type User struct {
	Id            int64  `json:"id,omitempty" key:"primary" autoincr:"1" column:"id"`
	FirstName     string `json:"first_name" column:"first_name"`
	LastName      string `json:"last_name" column:"last_name"`
	Email         string `json:"email" column:"email"`
	Password      string `json:"password" column:"password"`
	ContactNumber string `json:"contact_number" column:"contact_number"`
	UpdatedBy     int64  `json:"updated_by" column:"updated_by"`
}

func (user *User) Table() string {
	return "user_detail"
}

func (user *User) String() string {
	return Stringify(user)
}
