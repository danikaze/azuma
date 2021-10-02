import { useRef, useState } from 'react';
import { Props } from '.';
import { actionTypeToIconMap } from './constants';

interface State {
  comments: Props['comments'] | null;
  filterEnabled: boolean;
}

export function useMatchDetailsNarration({ comments }: Props) {
  const [state, setState] = useState<State>({
    comments: getComments(false),
    filterEnabled: false,
  });
  const refs = {
    checkbox: useRef<HTMLInputElement>(null),
  };

  function updateFilter() {
    setState((state) => {
      const filterEnabled = refs.checkbox.current!.checked;

      return {
        ...state,
        filterEnabled,
        comments: getComments(filterEnabled),
      };
    });
  }

  function getComments(filter: boolean): State['comments'] {
    if (!comments || !filter) return comments;
    return comments.filter((comment) => !!actionTypeToIconMap[comment.type]);
  }

  return {
    refs,
    updateFilter,
    comments: state.comments,
  };
}
