package model

type GroupUser struct {
    Id		  int64   `json:"group_id" column:"id"`
    UserId		  int64   `json:"user_id" column:"user_id"`
}

func (group_user *GroupUser) Table() string {
	return "group_user"
}

func (group_user *GroupUser) String() string {
	return Stringify(group_user)
}