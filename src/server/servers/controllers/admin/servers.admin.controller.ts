import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest} from "@nestjsx/crud";
import {Controller, UseGuards} from "@nestjs/common";
import {AuthenticatedGuard} from "../../../auth/guards/authenticated.guard";
import {Server} from "../../entity/server.entity";
import {ServersService} from "../../services/servers.service";
import {CreateServerDto} from "../../dto/createServer.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('admin')
@Crud({
	model: {
		type: Server,
	},
	query: {
		alwaysPaginate: true,
		join: {
			admin_role: {},
			maintainer_role: {}
		}
	}
})
@Controller("api/admin/servers")
export class ServersAdminController implements CrudController<Server> {
	constructor(
		public service: ServersService,
	) {}

	@Override("createOneBase")
	@UseGuards(AuthenticatedGuard)
	async createOne(@ParsedRequest() crudRequest: CrudRequest, @ParsedBody() dto: CreateServerDto) 	{
		return this.service._create(dto);
	}
}