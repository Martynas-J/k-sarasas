"use client"

import { API_URL } from "@/config/config";
import useSWR from "swr";

  export const FromDb = (link) => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data: result, isLoading, mutate } = useSWR(
      `${API_URL}/api/${link}`,
      fetcher
    );
    return {result, isLoading, mutate};
  }
