import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Header } from '../../components/header';
import { clientHttpGet } from '../../lib/httpHelper';

export default function CrUser() {
  const router = useRouter();
  const { userId } = router.query;

  const { data: cr, error } = useSWR(userId ? `/api/cr/${userId}` : null, async (url) => {
    const response = await clientHttpGet(url);
    if (response.ok) {
      const result = await response.json();
      if (result.responseCode !== 0) {
        throw new Error(result.message);
      }
      return result.payload;
    }
    const error = new Error(response.statusText);
    error.status = response.status;
    throw error;
  });

  const { data: transformers, error: fetchTransformersError } = useSWR(
    userId ? `/api/fetch-transformers/?croId=${userId}` : null,
    async (url) => {
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        if (result.responseCode !== 0) {
          throw new Error(result.message);
        }
        return result.payload;
      }
      const error = new Error(response.statusText);
      error.status = response.status;
      throw error;
    }
  );

  if (error) {
    console.error(error);
  }
  if (fetchTransformersError) {
    console.error(fetchTransformersError);
  }

  return (
    <div>
      <Header />
      {error?.status === 404 ? (
        <div className="flex justify-center pt-10 opacity-80">
          <p className="text-orange-600 font-black">User does not exist</p>
        </div>
      ) : (
        <div className="flex justify-between mx-auto mt-10 w-fit text-gray-600">
          <div className="w-112 mr-10">
            <h1 className="text-gray-700 font-bold">{cr?.name}</h1>
            <div className="flex text-sm my-2">
              <div className="flex mr-10 items-center">
                <h2 className="font-bold mr-2">Business unit</h2>
                <p>N/A</p> 
              </div>
              <div className="flex items-center">
                <h2 className="font-bold mr-2">Territory</h2>
                <p>N/A</p>
              </div>
            </div>
            <h2 className="italic text-sm py-2">List of transformers mapped to {cr?.name}</h2>
            <div className="rounded shadow text-gray-600">
              <div className="">
                <ul>
                  {transformers?.map((t) => (
                    <li
                      key={t.transformerName}
                      className="border-b first:border-t py-1 px-3 hover:bg-gray-50"
                    >
                      {t.transformerName}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
