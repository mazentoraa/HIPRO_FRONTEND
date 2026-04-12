export interface IClient {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  is_minor: boolean;
  is_deleted: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;

  // UX Fields (Optional in backend but used in UI)
  age?: number | null;
  payment_status?: string | null;
  attendance?: number | null;
  date_of_birth?: string | null;
  gender?: string | null;
  program?: string | null;

  // Parent information (Mandatory in doc/backend contract)
  first_parent_name: string | null;
  first_parent_relation?: string | null;
  first_parent_phone: string | null;
  first_parent_email: string | null;

  second_parent_name: string | null;
  second_parent_relation?: string | null;
  second_parent_phone: string | null;
  second_parent_email: string | null;
}
