package model

type GroupAccessEntry struct {
    ResourceId int64 `json:"resource_id" column:"resource_id"`
    Id		  int64   `json:"group_id" column:"id"`
    Permission int64  `json:"permission" column:"pid"`
}

func (groupaccess *GroupAccessEntry) Table() string {
	return "group_access_entry"
}

func (groupaccess *GroupAccessEntry) String() string {
	return Stringify(groupaccess)
}