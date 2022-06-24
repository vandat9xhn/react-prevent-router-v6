export interface handleClickPreventLinkProps {
  to: string;
  replace?: boolean;
}

export type handleClickPreventLinkType = (
  props: handleClickPreventLinkProps
) => void;

export type handleToggleHasIp = ({
  id,
  has_input
}: {
  id?: number;
  has_input: boolean;
}) => number;
