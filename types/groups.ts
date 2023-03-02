export type Groups = Record<string, string[]>;

export interface GroupSnapshot {
  datetime: string;
  groups: Groups;
  createdAt: string;
  id: string;
  updatedAt: string;
}

export type GroupErrorMessage =
  | "멤버가 아무도 없습니다."
  | "DB에 데이터가 없습니다. 개발자에게 어서 빨리 초기 세팅을 하라고 재촉해주세요.";
