import {useSelector} from 'react-redux';

const useAppAccessor = () => {
  const getApplication = useSelector(state => {
    return state.application;
  });

  const getSignup = useSelector(state => {
    return state.signup;
  });

  const getLogin = useSelector(state => {
    return state.login;
  });

  // const getProfile = useSelector(state => {
  //   return state.profile;
  // });

  const getHome = useSelector(state => {
    return state.home;
  });

  // const getNewExperience = useSelector(state => {
  //   return state.newExperience;
  // });

  // const getHistory = useSelector(state => {
  //   return state.history;
  // });

  // const getHistoryDetails = useSelector(state => {
  //   return state.historyDetails;
  // });

  return {
    getApplication: () => getApplication,
    getSignup: () => getSignup,
    getLogin: () => getLogin,
    // getProfile: () => getProfile,
    getHome: () => getHome,
    // getNewExperience: () => getNewExperience,
    // getHistory: () => getHistory,
    // getHistoryDetails: () => getHistoryDetails,
  };
};

export default useAppAccessor;
