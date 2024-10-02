import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import Loading from "@/common/components/Loading";

import useAuth from "@/hooks/useAuth";

type WithAuthProps = unknown;

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithAuth = (props: P & WithAuthProps) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace("/login");
      }
    }, [user, router]);

    if (!user) {
      return (
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
};

export default withAuth;
