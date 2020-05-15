package model

type Resource struct {
    Id            int64   `json:"id,omitempty" key:"primary" autoincr:"1" column:"id"`
    ResourceType  int64   `json:"rtype" column:"resource_type_id"`
    Parent        int64   `json:"prnt_id" column:"parent_resource_id"`
	ResourceName  string  `json:"rname" column:"resource_name"`
	ResourcePath  string  `json:"rpath" column:"location"`
	Owner		  int64   `json:"owner" column:"owner"`
}

func (resource *Resource) Table() string {
	return "resource_info"
}

func (resource *Resource) String() string {
	return Stringify(resource)
}
