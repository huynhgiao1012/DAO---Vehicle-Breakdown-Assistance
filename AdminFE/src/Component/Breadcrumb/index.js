import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
const BreadcrumbComponent = () => {
  const location = useLocation();
  const BreadcrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div>
        <Breadcrumb style={{ marginBottom: 10, marginTop: 20 }}>
          {pathnames.map((name, index) => {
            return (
              <Breadcrumb.Item key={index}>{capatilize(name)}</Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };
  return <>{BreadcrumbView()}</>;
};
export default BreadcrumbComponent;
