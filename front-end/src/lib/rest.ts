import { ref } from 'vue'
import { ApiAdapter } from './adapter'

export class ApiModule {
  // TODO: busy uses ref from vue. Vue usage must be decouples from core
  busy = ref(false)

  baseUrl: string

  constructor(baseUrl: string = (import.meta as any).env.VITE_API_DOMAIN) {
    this.baseUrl = baseUrl
  }

  setBusy(val: boolean) {
    this.busy.value = val
  }

  // TODO: Use environment variables on build
  protected getBaseUrl() {
    if (!this.baseUrl) {
      throw new Error('API base url not defined/found')
    }
    return this.baseUrl
  }

  protected handleResponse(response: any) {
  if (response.status === 401) {
    throw new Error(response.body?.errors?.base?.[0] || 'Sessão Expirada')
  }

  if (response.status === 403 || response.status === 402) {
    throw new Error('Erro de Permissões')
  }

  if (response.status === 413) {
    throw new Error('Arquivo acima do limite de 10mb')
  }

  if (response.status >= 500) {
    throw new Error('Erro na comunicação com a API')
  }

  if (response.status !== 200) {
    throw new Error(
      response.body?.errors?.base?.toString?.() ||
      'Erro desconhecido'
    )
  }
  
  return response
}

  fetch(url: string, options?: RequestInit, notifyError = true, notifyErrorAsModal = false) {
    this.setBusy(true)
    const input = this.getBaseUrl() + url;
    return fetch(input, {
      ...options,
      headers: {
        ...options?.headers,
      }
    })
      .then(async response => ({
        status: response.status,
        headers: response.headers,
        body: await response.json().catch(() => null)
      }))
      .then((response) => {
        return this.handleResponse(response)
      })
      .catch((e) => {
        if (notifyError) {
          ApiAdapter.instance.notify.error(e?.message || e, notifyErrorAsModal)
        }
        throw e
      })
      .finally(() => {
        this.setBusy(false)
      })
  }

  fetchBlob(url: string, options?: RequestInit, notifyError = true, notifyErrorAsModal = false) {
    this.setBusy(true)
    const input = this.getBaseUrl() + url;
    return fetch(input, {
      ...options,
      headers: {
        ...options?.headers,
      }
    })
      .then(async response => ({
        status: response.status,
        headers: response.headers,
        blob: await response.blob().catch(() => null)
      }))
      .then((response) => {
        return this.handleResponse(response)
      })
      .catch((e) => {
        if (notifyError) {
          ApiAdapter.instance.notify.error(e?.message || e, notifyErrorAsModal)
        }
        throw e
      })
      .finally(() => {
        this.setBusy(false)
      })
  }

  get(url: string, notificationMessage?: string, notifyError = true) {
    return this.fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }, notifyError).then(({ body }) => {
      if (notificationMessage) {
        ApiAdapter.instance.notify.success(notificationMessage)
      }
      return body
    })
  }

  post(url: string, data: Record<string, any>, notificationMessage?: string, notifyError = true) {
    return this.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }, notifyError).then(({ body }) => {
      if (notificationMessage) {
        ApiAdapter.instance.notify.success(notificationMessage)
      }
      return body
    })
  }

  patch(url: string, data: Record<string, any>, notificationMessage?: string, notifyError = true) {
    return this.fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }, notifyError).then(({ body }) => {
      if (notificationMessage) {
        ApiAdapter.instance.notify.success(notificationMessage)
      }
      return body
    })
  }

  delete(url: string, notificationMessage?: string, notifyError = true) {
    return this.fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }, notifyError).then(() => {
      if (notificationMessage) {
        ApiAdapter.instance.notify.success(notificationMessage)
      }
    })
  }
}