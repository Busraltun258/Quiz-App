export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface UserAnswersProps {
  userAnswers?: { [questionId: number]: string } | null;
  data: Post[];
}

export interface ChoiceProps {
  choice: string;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

export interface TimerProps {
  setCurrentIndex: (arg: number | ((prevIndex: number) => number)) => void;
  setSelectedChoice: (arg: string | null) => void;
  setCanSelectChoice: (arg: boolean) => void;
}