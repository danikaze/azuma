import { getPlayerName } from '@model/player';
import { Player, PlayerPosition } from '@model/player/interfaces';
import { Team } from '@model/team/interfaces';
import { PLAYERS_PER_PAGE } from '@utils/constants/ui';
import { ChangeEventHandler, useState } from 'react';
import { Props } from '.';

type PlayerInfo = {
  player: Pick<
    Player,
    | 'playerId'
    | 'name'
    | 'surname'
    | 'number'
    | 'position'
    | 'height'
    | 'weight'
  >;
  team?: Pick<Team, 'teamId' | 'name' | 'shortName'>;
};

interface State {
  currentPage: number;
  totalPages: number;
  textFilter: string;
  position: PlayerPosition | undefined;
  teamId: Team['teamId'] | undefined;
  currentPlayers: PlayerInfo[];
}

export function usePage({ players, teams }: Props) {
  const [state, setState] = useState<State>({
    currentPage: 0,
    totalPages: Math.ceil(players.length / PLAYERS_PER_PAGE),
    textFilter: '',
    position: undefined,
    teamId: undefined,
    currentPlayers: paginatePlayers(filterPlayers({}), 0),
  });

  const { currentPage, totalPages } = state;

  const selectNextPage =
    (currentPage < totalPages - 1 &&
      (() =>
        setState((state) =>
          updateFilter(state, {
            currentPage: state.currentPage + 1,
          })
        ))) ||
    undefined;

  const selectPrevPage =
    (currentPage > 0 &&
      (() =>
        setState((state) =>
          updateFilter(state, {
            currentPage: state.currentPage - 1,
          })
        ))) ||
    undefined;

  const selectPosition: ChangeEventHandler<HTMLSelectElement> = (ev) =>
    setState((state) =>
      updateFilter(state, {
        position: ev.target.value as PlayerPosition,
      })
    );

  const selectTeam: ChangeEventHandler<HTMLSelectElement> = (ev) =>
    setState((state) =>
      updateFilter(state, {
        teamId: ev.target.value as Team['teamId'],
      })
    );

  const setTextFilter: ChangeEventHandler<HTMLInputElement> = (ev) =>
    setState((state) =>
      updateFilter(state, {
        textFilter: ev.target.value.toLowerCase(),
      })
    );

  function updateFilter(
    state: State,
    changes: Partial<
      Pick<State, 'textFilter' | 'position' | 'teamId' | 'currentPage'>
    >
  ): State {
    const filter = {
      currentPage: state.currentPage,
      textFilter: state.textFilter,
      position: state.position,
      teamId: state.teamId,
      ...changes,
    };

    const filteredPlayers = filterPlayers(filter);
    const totalPages = Math.ceil(filteredPlayers.length / PLAYERS_PER_PAGE);
    const currentPage = Math.min(filter.currentPage, totalPages - 1);

    return {
      ...state,
      ...filter,
      totalPages,
      currentPage,
      currentPlayers: paginatePlayers(filteredPlayers, currentPage),
    };
  }

  function filterPlayers(
    filter: Partial<Pick<State, 'textFilter' | 'position' | 'teamId'>>
  ): PlayerInfo[] {
    const { textFilter, position, teamId } = filter;

    return players
      .filter(
        (player) =>
          (!teamId || player.teamId === teamId) &&
          (!position || player.position === position) &&
          (!textFilter ||
            getPlayerName(player).toLowerCase().includes(textFilter))
      )
      .map((player) => ({
        player,
        team: teams.find((team) => team.teamId === player.teamId),
      }));
  }

  return {
    selectNextPage,
    selectPrevPage,
    selectPosition,
    selectTeam,
    setTextFilter,
    totalPages: state.totalPages,
    currentPage: state.currentPage,
    currentPlayers: state.currentPlayers,
  };
}

function paginatePlayers(
  filteredPlayers: PlayerInfo[],
  page: number
): PlayerInfo[] {
  return filteredPlayers.slice(
    PLAYERS_PER_PAGE * page,
    PLAYERS_PER_PAGE * (page + 1)
  );
}
