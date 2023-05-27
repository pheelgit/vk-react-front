import { Friend } from 'entities/index';
import React from 'react';
import { useSelector } from 'react-redux';

import { friendApi } from 'shared';

export const FriendsPage = () => {
  const token = useSelector((state) => state.auth.token);

  const { data: userFriends, refetch } = friendApi.useGetUserFriendsQuery(
    {
      token,
    },
    {
      skip: !token,
    }
  );
  const [removeFriend] = friendApi.useRemoveFriendMutation();

  const handleRemoveFriend = async ({ friendId, token }) => {
    removeFriend({ token, friendId });
    refetch();
  };

  return (
    <div>
      {userFriends?.map((friend) => (
        <Friend key={friend?._id} friend={friend} remove={handleRemoveFriend} />
      ))}
    </div>
  );
};
