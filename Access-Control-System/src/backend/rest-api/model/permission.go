package model

type Permission struct {
    Id		  int64   `json:"group_id" column:"id"`
    Pread 	int64  `json:"can_read" column:"p_read"`
    Pwrite 	int64  `json:"can_write" column:"p_write"`
}

func (permission *Permission) Table() string {
	return "permission_bit"
}

func (permission *Permission) String() string {
	return Stringify(permission)
}