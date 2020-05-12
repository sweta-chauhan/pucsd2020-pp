package model

type ResourceType struct {
    Id int64 `json:"type_id" column:"id"`
    Description string  `json:"description" column:"description"`
}

func (rtype *ResourceType) Table() string {
	return "resource_type_domain"
}

func (rtype *ResourceType) String() string {
	return Stringify(rtype)
}