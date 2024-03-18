export default class HttpClient<TResponse> {
  async get(url: string, headers?: HeadersInit): Promise<TResponse> {
    const response = await fetch(url, { headers });

    if (!response.ok || response.status != 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as TResponse;
  }

  async post<TBody>(
    url: string,
    body: TBody,
    headers?: HeadersInit
  ): Promise<TResponse> {
    console.log("Requesting:", url, "with", body);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.ok}`);
    }

    return (await response.json()) as TResponse;
  }

  async put<TBody>(
    url: string,
    body: TBody,
    headers?: HeadersInit
  ): Promise<TResponse> {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });

    if (!response.ok || response.status != 200) {
      throw new Error(`HTTP error! status: ${response.ok}`);
    }

    return (await response.json()) as TResponse;
  }

  async delete<TBody>(
    url: string,
    body: TBody,
    headers?: HeadersInit
  ): Promise<TResponse> {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });

    if (!response.ok || response.status != 200) {
      throw new Error(`HTTP error! status: ${response.ok}`);
    }

    return (await response.json()) as TResponse;
  }
}
