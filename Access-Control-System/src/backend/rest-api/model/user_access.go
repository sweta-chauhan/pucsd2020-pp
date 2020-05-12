package model

type UserAccessEntry struct {
    ResourceId int64 `json:"resource_id" column:"resource_id"`
    Id		  int64   `json:"user_id" column:"id"`
    Permission int64  `json:"permission" column:"pid"`
}

func (useraccess *UserAccessEntry) Table() string {
	return "user_access_entry"
}

func (useraccess *UserAccessEntry) String() string {
	return Stringify(useraccess)
}