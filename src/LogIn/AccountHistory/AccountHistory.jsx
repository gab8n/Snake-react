import { useState, useEffect } from 'react';
import { getUserHistory } from '../../Services/firebase';
import { useSelector } from 'react-redux';
import styles from './AccountHistory.module.scss';

const AccountHistory = () => {
  const [userHistory, setUserHistory] = useState();
  const userData = useSelector((state) => state.auth.userData);

  const { accountHistoryContainer, historyIndexStyle } = styles;

  const getData = async () => {
    const result = await getUserHistory(userData.userId);
    setUserHistory(result);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={accountHistoryContainer}>
      {userHistory &&
        userHistory.map((element, index) => {
          return (
            <p>
              <span className={historyIndexStyle}>{index}.</span>
              {element}
            </p>
          );
        })}
    </div>
  );
};

export default AccountHistory;
