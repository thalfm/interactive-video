<?php declare(strict_types=1);

namespace App\Http\Requests\API;

use App\Models\Resposta;
use InfyOm\Generator\Request\APIRequest;

class UpdatePerguntaRespostaAPIRequest extends APIRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     * @return array
     */
    public function rules()
    {
        unset(Resposta::$rules['id_perguntas']);

        return Resposta::$rules;
    }
}
