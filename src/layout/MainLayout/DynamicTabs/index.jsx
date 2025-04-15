import { useSelector } from "react-redux";
import { Suspense } from "react";
import { TabComponents } from "menu-tabs";
import Default from "views/default";

const DynamicTabContent = () => {
  const { activeTabKey, tabList } = useSelector((state) => state.tab);
//   const { permissions: userPermissions } = useSelector((state) => state.auth);

  const currentTab = tabList.find((tab) => tab.key === activeTabKey);
    console.log('tabList', tabList)
  if (!currentTab) return <div>Tab không tồn tại.</div>;

  // Check quyền
  const requiredPermission = currentTab.permission;
  const hasPermission = !requiredPermission || userPermissions.includes(requiredPermission);

  const Component = TabComponents[currentTab.component];

  return (
    <div className="h-[750px]">
      <Suspense fallback={<div>Loading...</div>}>
        {hasPermission ? (
          Component ? <Component /> : <div>Không tìm thấy component.</div>
        ) : (
          <Default />
        )}
      </Suspense>
    </div>
  );
};

export default DynamicTabContent;
