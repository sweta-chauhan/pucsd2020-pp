package model

type Group struct {
	Id            int64  `json:"id,omitempty" key:"primary" autoincr:"1" column:"id"`
	GroupName     string `json:"gname" column:"group_name"`
	
}

func (group *Group) Table() string {
	return "group_info"
}

func (group *Group) String() string {
	return Stringify(group)
}
