import { memo } from 'react';

import { UsersSection } from '@/ui/sections';

const Users = () => <UsersSection />;

const UsersPage = memo(Users);

export default UsersPage;
