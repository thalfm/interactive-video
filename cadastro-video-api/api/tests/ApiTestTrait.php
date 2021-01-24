<?php namespace Tests;

use App\Models\Curso;

trait ApiTestTrait
{
    private $response;

    private static string $primaryKey = '';

    public static function setUpBeforeClass(): void
    {
        parent::setUpBeforeClass();
        $class =  self::MODEL;
        self::$primaryKey = (new $class)->getKeyName();
    }

    public function assertApiResponse(Array $actualData)
    {
        $this->assertApiSuccess();

        $response = json_decode($this->response->getContent(), true);
        $responseData = $response['data'];

        $this->assertNotEmpty($responseData[self::$primaryKey]);
        $this->assertModelData($actualData, $responseData);
    }

    public function assertApiSuccess()
    {
        $this->response->assertStatus(200);
        $this->response->assertJson(['success' => true]);
    }

    public function assertModelData(Array $actualData, Array $expectedData)
    {
        foreach ($actualData as $key => $value) {
            if (in_array($key, ['created_at', 'updated_at'])) {
                continue;
            }
            $this->assertEquals($actualData[$key], $expectedData[$key]);
        }
    }
}
