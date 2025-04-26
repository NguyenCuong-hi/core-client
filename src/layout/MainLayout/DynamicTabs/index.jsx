import { useSelector } from "react-redux";
import { Suspense } from "react";
import { TabComponents } from "menu-tabs";
import Default from "views/default";
import Spinner from "component/Loader/load";

const DynamicTabContent = () => {
  const { activeTabKey, tabList } = useSelector((state) => state.tab);
  // const { permissions: userPermissions } = useSelector((state) => state.auth);

  return (
    <div style={{ height: 'calc(100vh - 110px)', position: 'relative' }}>
      {tabList.map((tab) => {
        const Component = TabComponents[tab.component];
        const isActive = tab.key === activeTabKey;
        // const requiredPermission = tab.permission;
        // const hasPermission = !requiredPermission || userPermissions.includes(requiredPermission);
        const hasPermission = true; // Bỏ tạm nếu không dùng auth

        return (
          <div
            key={tab.key}
            style={{
              display: isActive ? 'block' : 'none',
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            <Suspense fallback={<Spinner />}>
              {hasPermission ? (
                Component ? <Component /> : <Default />
              ) : (
                <Default />
              )}
            </Suspense>
          </div>
        );
      })}
    </div>
  );
};

export default DynamicTabContent;
