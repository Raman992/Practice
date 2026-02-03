"use client";

import { notFound, useParams } from "next/navigation";
import { useGetUserByIdQuery } from "@/store/services/placeholderAPI";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserDetailsPage() {
  const params = useParams();
  const userId = Number(params.id);

  const { data, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: isNaN(userId),
  });

  if (isLoading) {
    return (
      <div className="p-6 text-white flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !data) {
    return (
     notFound()
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
    </div>
  );
}
