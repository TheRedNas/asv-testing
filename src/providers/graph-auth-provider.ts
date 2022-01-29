import {AuthenticationProvider, AuthenticationProviderOptions} from "@microsoft/microsoft-graph-client";
import {HttpClient} from "@angular/common/http";

export class GraphAuthProvider implements AuthenticationProvider {
  private readonly _graphApiTokenEndpoint = "https://func-freeboard-westeu-01.azurewebsites.net/api/GetGraphAPITokenHttpTrigger?code=mdMO4HFE1pYyylTBkHbEwSGjtcJm3uXfuDkaYr127xQ7wCqdT6FgDw==";

  constructor(private httpClient: HttpClient) { }

  async getAccessToken(authenticationProviderOptions: AuthenticationProviderOptions | undefined): Promise<string> {
    return this.httpClient.get<string>(this._graphApiTokenEndpoint).toPromise();
  }
}
