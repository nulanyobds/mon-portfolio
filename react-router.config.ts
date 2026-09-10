import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: ["/", "/etudes-de-cas/club-croissance-business"],
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
} satisfies Config;
