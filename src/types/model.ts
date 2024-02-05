export interface Model {
  id?: number
  status?: number
  created_at?: string
  updated_at?: string
}

export interface Permission extends Model {
  name: string
  uuid: string
  type?: number
  icon?: string
  path?: string
  sequence?: number | undefined
  children: Permission[]
  component?: string
  description?: string
  parent_id?: number
}
