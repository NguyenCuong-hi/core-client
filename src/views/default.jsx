import { useTranslation } from 'react-i18next'
import { Layout } from 'antd'

export default function Default({ permissions, isMobile }) {
  const { t } = useTranslation()

  return (
    <Layout className="h-screen  bg-slate-50">
      {/* <Helmet>
        <title>MANUFACTORY ADMIN</title>
      </Helmet> */}

      <div className="grid h-screen place-content-center items-center  justify-center bg-slate-50 ">
        <img className=" w-80 opacity-55 h-auto mb-10" />
      </div>
    </Layout>
  )
}
