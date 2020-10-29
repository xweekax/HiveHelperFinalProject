export interface ActionDetail {
  id: number;
  primary_action_id: number;
  secondary_action_id: number;
  tertiary_action_id: number;
  hive_id: number;
  completed_by_id: number;
  entered_by_id: number;
  completed: boolean;
  entry_date: Date | string;
  completed_date: Date | string;
  scheduled_date: Date | string;
  comments: string;
  primary_action_name: string;
  secondary_action_name: string;
  tertiary_action_name: string;
  completed_by_first_name: string;
  completed_by_last_name: string;
  entered_by_first_name: string;
  entered_by_last_name: string;
}
