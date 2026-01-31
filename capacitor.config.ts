import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.senseapps.rates",
  appName: "rates",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
}

export default config
