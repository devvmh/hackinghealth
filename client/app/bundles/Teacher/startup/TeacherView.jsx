import React from 'react';
import ReactOnRails from 'react-on-rails';

import Teacher from '../containers/Teacher';

const TeacherView = (props) => (
  <Teacher {...props} />
);

ReactOnRails.register({ TeacherView });
