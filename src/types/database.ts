export interface Database {
  public: {
    Tables: {
      registration_requests: {
        Row: {
          id: number
          name: string
          email: string
          phone: string
          organization: string
          country: string
          created_at: string
        }
        Insert: {
          id?: never
          name: string
          email: string
          phone: string
          organization: string
          country: string
          created_at?: string
        }
        Update: {
          id?: never
          name?: string
          email?: string
          phone?: string
          organization?: string
          country?: string
          created_at?: string
        }
      }
    }
  }
}