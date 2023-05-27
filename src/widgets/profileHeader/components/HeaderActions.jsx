import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { friendApi, authApi } from 'shared';
import { HeaderActionsEditProfile } from './HeaderActionsEditProfile';

const HeaderActions = () => {
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();
  const { data: getMeData } = authApi.useGetMeQuery(token, {
    refetchOnMountOrArgChange: true,
    skip: !token,
  });

  const { data: getMyFriends = [], refetch } = friendApi.useGetUserFriendsQuery(
    {
      token,
    },
    {
      // refetchOnMountOrArgChange: true,
      skip: !token,
    }
  );

  const [addFriend] = friendApi.useAddFriendMutation();
  const [removeFriend] = friendApi.useRemoveFriendMutation();

  if (getMeData?._id === id) {
    return <HeaderActionsEditProfile />;
  }

  return (
    <div>
      {getMyFriends.length ?? getMyFriends.includes(id) ? (
        <Button
          children="удалить из друзей"
          onClick={async () => {
            await removeFriend({ token, friendId: id });
            refetch();
          }}
        />
      ) : (
        <Button
          children="добавить в друзья"
          onClick={async () => {
            await addFriend({ token, friendId: id });
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default HeaderActions;
