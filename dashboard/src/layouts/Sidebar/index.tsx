import { memo } from 'react';
import isEqual from 'react-fast-compare';

// components
import { ExpandSidebar, MiniSidebar } from '@app/components';

export type SidebarProps = {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
};

const Sidebar = ({ onClose, onOpen, isOpen }: SidebarProps) => (
  <>
    <ExpandSidebar onClose={onClose} onOpen={onOpen} isOpen={!isOpen} />
    <MiniSidebar onClose={onClose} isOpen={isOpen} />
  </>
);

const SideBarComponent = memo(Sidebar, isEqual);

export default SideBarComponent;
