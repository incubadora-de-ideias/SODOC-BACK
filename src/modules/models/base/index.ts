// Modelo base para qualquer outro da aplicação

export type TBaseGetAllParams = {
  take?: number;
  skip?: number;
  filter?: string;
}; // Tipagem para paginação: define os parâmetros `take` (limite) e `skip` (deslocamento).

export abstract class BaseModel<T> {
  protected model: any;
  protected include?: {};
  protected getAllWherClause?: {};
  protected orderBy?: {};
  // Propriedade opcional para definir relações que devem ser incluídas nas consultas.

  /**
   * Cria um novo registro no banco de dados.
   * @param data Os dados necessários para criar o registro, exceto o campo `id` (pois é gerado automaticamente).
   * @returns O registro criado com as relações incluídas, se especificadas.
   */
  async create(
    data: Omit<T, "id" | "created_at" | "updated_at" | "data">
  ): Promise<T | {}> {
    return await this.model.create({ data });
  }

  /**
   * Busca um registro único pelo ID.
   * @param id O identificador único do registro.
   * @returns O registro correspondente ao ID ou `null` se não encontrado.
   */
  async getById(id: string): Promise<T | null> {
    return await this.model.findUnique({
      where: { id },
      include: this.include,
    });
  }

  /**
   * Recupera uma lista de registros do banco de dados sem incluir relações.
   * @returns Uma lista de registros sem relações incluídas.
   */

  async getAllWithoutIncludes({ skip, take }: TBaseGetAllParams = {}) {
    return await this.model.findMany({
      skip,
      take,
      orderBy: this.orderBy,
    });
  }
  /**
   * Recupera uma lista de registros do banco de dados com suporte a paginação.
   * @param skip Número de registros a pular (offset).
   * @param take Número máximo de registros a retornar (limit).
   * @returns Uma lista de registros com as relações incluídas, se especificadas.
   */
  async getAll({ skip, take }: TBaseGetAllParams = {}) {
    return await this.model.findMany({
      skip,
      take,
      include: this.include,
      orderBy: this.orderBy,
    });
  }

  /**
   * Conta o número total de registros no banco de dados, aplicando filtros se fornecidos.
   * @param params Parâmetros para o método `count` do Prisma, incluindo condições de filtro (`where`).
   * @returns O número total de registros que atendem aos critérios fornecidos.
   */
  async count(params?: Parameters<typeof this.model.count>[0]) {
    return await this.model.count(params || { where: this.getAllWherClause });
  }
  /**
   * Atualiza os dados de um registro existente no banco de dados.
   * @param id O identificador único do registro a ser atualizado.
   * @param data Os dados atualizados a serem aplicados no registro.
   * @returns O registro atualizado com as relações incluídas, se especificadas.
   */
  async update(id: string, data: Partial<T>) {
    return await this.model.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  /**
   * Deleta um registro do banco de dados pelo ID.
   * @param id O identificador único do registro a ser deletado.
   * @returns O registro deletado com as relações incluídas, se especificadas.
   */

  async delete(id: string): Promise<T | {}> {
    return await this.model.delete({ where: { id }, include: this.include });
  }
}
