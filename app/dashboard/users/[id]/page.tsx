"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetPostsQuery, useGetUserByIdQuery } from "@/store/services/placeholderAPI";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.id);

  const { total } = useGetPostsQuery(undefined, {
  selectFromResult: ({ data }) => ({
    total: data?.total ?? 0,
  }),
});


  const { data, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: isNaN(userId),
  });

  function nextUser() {
    router.push(`/dashboard/users/${userId + 1}`);
  }

  function previousUser() {
    router.push(`/dashboard/users/${userId - 1}`);
  }


  if (isLoading) {
    return (
      <div className="p-6 text-white flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 text-white">
        <p className="text-red-400 mb-4">Failed to load user details.</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="p-6 text-white max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Details</h1>
        <Link href="/dashboard">
          <Button variant="secondary">← Back</Button>
        </Link>
      </div>

      <div className="space-y-6 bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Basic Info</h2>
          <p><span className="text-gray-400">Name:</span> {data.name}</p>
          <p><span className="text-gray-400">Username:</span> {data.username}</p>
          <p><span className="text-gray-400">Email:</span> {data.email}</p>
          <p><span className="text-gray-400">Phone:</span> {data.phone}</p>
          <p><span className="text-gray-400">Website:</span> {data.website}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Address</h2>
          <p>{data.address.street}, {data.address.suite}</p>
          <p>{data.address.city}, {data.address.zipcode}</p>
          <p className="text-sm text-gray-400">
            Lat: {data.address.geo.lat}, Lng: {data.address.geo.lng}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Company</h2>
          <p><span className="text-gray-400">Name:</span> {data.company.name}</p>
          <p><span className="text-gray-400">Catch Phrase:</span> {data.company.catchPhrase}</p>
          <p><span className="text-gray-400">Business:</span> {data.company.bs}</p>
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-6">
        <Button
          size="sm"
          variant="outline"
          onClick={previousUser}
          disabled={userId <= 1}
        >
          ←
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={nextUser}
          disabled={userId >= total}
        >
          →
        </Button>
      </div>

    </div>
  );
}
